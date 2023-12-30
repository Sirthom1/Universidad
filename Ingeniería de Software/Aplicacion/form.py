from os import name
from django import forms
import django.contrib.auth.forms as auth


class RegisterForm(auth.UserCreationForm):
   """RegosterForm is a form to save the information of the user, the username, password1 and password2 are inherited 
    from UserCreationForm
   Keywords:
    email: type EmailField """
   email = forms.EmailField(label="Correo", required=True)

class LoginForm(forms.Form):
   """LoginForm to save the information of the user who is loguin, we remove al the label suffix
   Keywords:
    username: CharField and the label is "usuario"
    passwordd: CharField and the label is "contraseña" """
   def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""  # Removes : as label suffix

   username = forms.CharField(label="Usuario")
   password = forms.CharField(label="Constraseña", widget=forms.PasswordInput)



#Options for the category, will be use in the class TransactionForm
options = [
   ('select', 'Selecciona una categoría'),
   ('home', 'Hogar'),
   ('entertainment', 'Entretención'),
   ('transfer', 'Transferencia'),
   ('others', 'Otros'),
]

#A transaction can be a income or a discharge.
optionsType = [
   ('income', 'Ingreso'),
   ('discharge', 'Egreso'),
]

 
class TransactionForm(forms.Form):
   """TransactionForm is a form to save the information of a transaction
    Keywords:
     type: the type of the transaction (a Income or a discharge)
     description: the store where you paid or the person who will receive your money
     amount: the amount of the transaction, it always be positive
     date: the date when the transaction was done
     category: the category of the transacton  """
   type = forms.ChoiceField(choices=optionsType, label="Seleccione un tipo de movimiento", widget=forms.RadioSelect, required=True)
   description = forms.CharField(label="Nombre", required=True)
   amount = forms.IntegerField(label="Monto", required=True)
   date = forms.DateField(label="Fecha", required=True) #YYYY-MM-DD
   category = forms.ChoiceField(choices=options, label='Selecciona una categoría', initial='select', required=True)