from django.db import models
from django.shortcuts import get_object_or_404
from django.dispatch import receiver


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    last_modified = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return self.name
    

    def save(self, *args, **kwargs):
        for field in self._meta.fields:
            if field.get_internal_type() == 'CharField':
                value = getattr(self, field.name)
                if isinstance(value, str):
                    setattr(self, field.name, value.lower())
        
        super().save(*args, **kwargs)    
    

class Item(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1, related_name='items')
    price = models.IntegerField() 

    class ItemStatus(models.TextChoices):
        AVAILABLE = 'available', 'Available'
        NOT_AVAILABLE = 'not_available', 'Not Available'

    status = models.CharField(
        max_length=20,
        choices=ItemStatus.choices,
        default=ItemStatus.NOT_AVAILABLE
    )

    last_modified = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='dishes/', blank=True, null=True)
    prep_time = models.DurationField(null=True, blank=True,verbose_name="Preparation Time",help_text="Duration to prepare the meal")
    description = models.TextField(blank=True) 

    def save(self, *args, **kwargs):
        for field in self._meta.fields:
            if field.get_internal_type() == 'CharField' or 'TextField':
                value = getattr(self, field.name)
                if isinstance(value, str):
                    setattr(self, field.name, value.lower())
       
       #logic for deleteting the unchanged image 
        if self.id:
            existing = get_object_or_404(Item, id=self.id)
            if existing.image != self.image:
                existing.image.delete(save=False)
        
        super().save(*args, **kwargs)
    
    #signal for deleteting the unchanged image 
    @receiver(models.signals.pre_delete, sender="home.Item")
    def server_delete_files(sender, instance, **kwargs):

        if instance.id is not None:
            for field in instance._meta.fields:
                if field.name == "image":
                    file = getattr(instance, field.name)
                    if file:
                        file.delete(save=False)

    def __str__(self):
        return self.name                    
                        

class Nutrition(models.Model):
    item = models.OneToOneField(Item, on_delete=models.CASCADE, related_name='nutrition')
    calories = models.IntegerField(default=0)
    fat = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    protein = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    carbohydrates = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    sugar = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    last_modified = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return f"Nutrition for {self.item.name}"