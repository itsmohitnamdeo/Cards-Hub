from django.db import models

class Card(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    column = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)  # Add default value

    def __str__(self):
        return self.title
