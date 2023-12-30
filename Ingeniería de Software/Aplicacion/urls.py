
from django.urls import path
from . import views


#Create the path for the register, meaning the url will bi "direcion/register"
urlpatterns = [
        path('register', views.request_registration, name='register_user'),
        path('login', views.login_user, name='login_user'),
        path('transaction', views.transaction, name='transaction'),
        path('', views.index, name='index'),
        path('accounts/login/', views.login_user, name='login_user'),
        path('logout', views.logout_user, name='logout_user'),
        path('filter-transactions/', views.filter_transactions, name='filter_transactions'),
        path('transaction/edit/<int:transaction_id>', views.edit_transaction, name='edit_transaction'),
        path('transaction/delete/<int:transaction_id>', views.delete_transaction, name='delete_transaction')
]


 