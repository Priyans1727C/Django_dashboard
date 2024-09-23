from django.shortcuts import render
from .models import Item
from django.core.serializers import serialize


# Create your views here.
def home(request):
    items = Item.objects.all()
    table = items.values()
    return render(request,'home/index.html',context={"table_title":"Avilable Items","table":table,"cards":items})