from django import template
from datetime import timedelta
from datetime import datetime

register = template.Library()
@register.filter(name='pascalcase')
def pascal_case(value):
    if isinstance(value, str):
        return value.title()
    return value

@register.filter(name='to_minute')
def to_minute(value):
    if isinstance(value, timedelta):
        return int(value.total_seconds() / 60)
    else:
        return 0
    
@register.filter(name='date')
def date(value):
    current_date = datetime.now()
    formatted_date = current_date.strftime("%B, %d")
    return formatted_date
