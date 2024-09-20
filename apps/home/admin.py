from django.contrib import admin
from .models import Category, Item, Nutrition

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)  

class NutritionInline(admin.StackedInline):  
    model = Nutrition 

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'status')
    list_filter = ('category', 'status')
    inlines = [NutritionInline]  

@admin.register(Nutrition)
class NutritionAdmin(admin.ModelAdmin):
    list_display = ('item_id', 'item_name', 'calories', 'fat', 'protein') 

    def item_id(self, obj):
        return obj.item.id
    item_id.short_description = 'Item ID'

    def item_name(self, obj):
        return obj.item.name
    item_name.short_description = 'Item Name' 