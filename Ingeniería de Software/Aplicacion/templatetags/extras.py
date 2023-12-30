from django import template

register = template.Library()

@register.filter
def abs_value(value):
    """Calculates the absolute value of a number"""
    return abs(value)