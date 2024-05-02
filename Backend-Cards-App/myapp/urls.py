from django.urls import path
from .views import CardListCreateView, CardDetailView

urlpatterns = [
    path('cards/', CardListCreateView.as_view(), name='card-list'),
    path('cards/<int:pk>/', CardDetailView.as_view(), name='card-detail'),
]
