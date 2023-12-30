import json
from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.core import serializers
from Aplicacion.models import User, Transaction

from django.http import HttpResponseRedirect, JsonResponse
from Aplicacion.form import LoginForm, TransactionForm
from Aplicacion.form import RegisterForm

from django.shortcuts import get_object_or_404

from django.db.models import Sum



def request_registration(request):
    """Request of the registration
     GET: only render the html
     POST: save the fields with the information of the user, create the user in the database and redirect to the login """
    if request.method == "GET":
        register_form = RegisterForm()
        return render(
            request, "Aplicacion/register_user.html", {"register_form": register_form}
        )

    elif request.method == "POST":
        register_form = RegisterForm(request.POST)
        username = request.POST["username"]
        password = request.POST["password1"]
        email = request.POST["email"]

        User.objects.create_user(username=username, password=password, email=email)
        return HttpResponseRedirect("/login")



def login_user(request):
    """Request of the login
     GET: only render the login_form.html
     POST: Do the validation of the user, with the functions authenticate() and login() and clean the data"""
    if request.method == "GET":
        login_form = LoginForm()
        return render(request, "Aplicacion/login_form.html", {"login_form": login_form})
    elif request.method == "POST":
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data["username"]
            password = login_form.cleaned_data["password"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                request.session["user_id"] = user.id
                request.session["user_username"] = user.username
                return HttpResponseRedirect("/")
            else:
                login_form.add_error(None, "Usuario o contraseña incorrectos")
        return render(request, "Aplicacion/login_form.html", {"login_form": login_form})


#you must be login to use this request
@login_required
def index(request):
    """Request of the index, only has GET and calculate de amaount of the account with the function "sum()"
     and render the html with, the username, the formatted ammount and all the transactions """
    if request.method == "GET":
        transactions = Transaction.objects.filter(owner=request.user).order_by("-date")
        amount = transactions.aggregate(Sum("amount"))["amount__sum"] or 0
        formatted_amount = '{:,.0f}'.format(amount).replace(",", "@").replace(".", ",").replace("@", ".")
        context = {"username": request.user.username, "amount": formatted_amount, "transactions": transactions}
        return render(request, "Aplicacion/index.html", context)


@login_required
def logout_user(request):
    """Do the logout of the user """
    logout(request)
    return redirect('login_user') 


@login_required
def transaction(request):
    """Transaction requesst
     GET: extract the information of the transaction from the form and render it
     POST: Confirm that the transaction is valid, delete the field "type" because is not relevant and create the object in 
      the database """
    if request.method == "GET":
        transaction_form = TransactionForm()
        return render(
            request,
            "Aplicacion/transaction_form.html",
            {"transaction_form": transaction_form},
        )

    if request.method == "POST":
        transaction_form = TransactionForm(request.POST)
        if transaction_form.is_valid():
            cleaned_data = transaction_form.cleaned_data
            cleaned_data.pop("type")
            if request.user.is_authenticated:
                Transaction.objects.create(**cleaned_data, owner=request.user)
            else:
                Transaction.objects.create(**cleaned_data)
        return HttpResponseRedirect("/")


@login_required
def edit_transaction(request, transaction_id):
    """Edit transaction request 
    GET: initialize the form with the transaction values and create the form
    POST: clean the data from the form, delete the type atribute, save the owner of the transaction
    and update the transaction values with the new ones"""

    transaction = get_object_or_404(Transaction, id=transaction_id)

    if request.method == "GET":
        initial_data = {
            'type': ('income', 'Ingreso') if transaction.amount > 0 else ('discharge', 'Egreso'),
            'description': transaction.description,
            'amount': abs(transaction.amount),
            'date': transaction.date.strftime("%Y-%m-%d"),
            'category': transaction.category
        }
        transaction_form = TransactionForm(initial=initial_data)
        return render(
            request,
            "Aplicacion/transaction_form.html",
            {"transaction_form": transaction_form},
        )

    if request.method == "POST":
        transaction_form = TransactionForm(request.POST)
        if transaction_form.is_valid():
            cleaned_data = transaction_form.cleaned_data
            if "type" in cleaned_data:
                cleaned_data.pop("type")
            if request.user.is_authenticated:
                transaction.owner = request.user
            transaction.description = cleaned_data['description']
            transaction.amount = cleaned_data['amount']
            transaction.date = cleaned_data['date']
            transaction.category = cleaned_data['category']

            transaction.save()
        return HttpResponseRedirect("/")
    

@login_required
def filter_transactions(request):
    """Filter transaction is the fuction who do de the filter by category and dates.
     This extract the information frrom a json, filter the transactions by category and for 
     data_from to date_to (with the datatime change to the values) and finally serialized the transaction
     and return a JsonResponse with the data"""
    data = json.loads(request.body)
    category = data.get("category")
    date_from = data.get("date_from")
    date_to = data.get("date_to")
    transactions = Transaction.objects.filter(owner=request.user)
    if category != "all" and category != "":
        transactions = transactions.filter(category=category)
    if date_from and date_to:
        date_from = datetime.strptime(date_from, "%Y-%m-%d").date() 
        date_to = datetime.strptime(date_to, "%Y-%m-%d").date()
        transactions = transactions.filter(date__range=(date_from, date_to))
    serialized_transactions = serializers.serialize('json', transactions)
    return JsonResponse({'transactions': serialized_transactions})

@login_required
def delete_transaction(request, transaction_id):
    """Delethe the transaction with the fuction "delete()" and redirect to the same page url"""
    transaction = get_object_or_404(Transaction, id=transaction_id)
    if request.method == "GET":
        transaction.delete()
        return redirect("/") 
    if request.method == "POST":
        transaction.delete()
        return redirect("/")
    return redirect("/")