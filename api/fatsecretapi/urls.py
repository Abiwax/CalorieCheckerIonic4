from django.conf.urls import url
from . import views

app_name = 'fatsecretapi'
urlpatterns = [
    url(r'^foods/$', views.foods, name='foods'),
    url(r'^food/$', views.food, name='food'),
    url(r'^recipes/$', views.recipes, name='recipes'),
    url(r'^recipe/$', views.recipe, name='recipe')
]