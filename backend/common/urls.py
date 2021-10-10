from django.urls import path

from . import views

app_name = 'common'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('login/',  views.IndexView.as_view(), name='login'),
    path('daily/', views.IndexView.as_view()),
    path('statements/', views.IndexView.as_view()),
    path('orders/', views.IndexView.as_view()),

]
