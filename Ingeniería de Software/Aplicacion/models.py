from django.db import models
from datetime import date

# Bring AbstracUser from django models to use it for de class User
from django.contrib.auth.models import AbstractUser


"""User is the class of the user, do not have parametres because are inherited for AbstracUser """
class User(AbstractUser):
    pass


#The optiones avalibable for the category of a transaction
options = [
    ("select", "Selecciona una categoría"),
    ("home", "Hogar"),
    ("entertainment", "Entretención"),
    ("transfer", "Transferencia"),
    ("others", "Otros"),
]



class Transaction(models.Model):
    """Transaction is a model 
    Keywords:
     id: A serial number who is the primary key of the transaction
     owner: a foreign Key whon represents the user who did the transaction
     description: the store where you paid or the person who will receive your money (max 255 characters)
     amount: the amount of the transaction, it always be positive
     date: the date when the transaction was done
     category: the category of the transacton """
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    amount = models.IntegerField()
    date = models.DateField(default=date.today)
    category = models.CharField(max_length=50, choices=options, null=True, blank=False)

    def __str__(self):
        txt = "Transaction {0}, User : {1}"
        return txt.format(self.id, self.owner.username)
