from django.db import models
from django.utils import timezone
from user.models import User


class BaseModel(models.Model):
    '''
    BaseModel for all models,
    It will contain general fields like, when record was created and 
    '''
    created_on = models.DateTimeField(editable=False)
    modified_on = models.DateTimeField(editable=False, default=timezone.now)
    # TODO should not be true, has to be removed after functionally is implemented
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='%(app_label)s_%(class)s_created_by')
    modified_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='%(app_label)s_%(class)s_modified_by')
    last_viewed_on = models.DateTimeField(editable=False)
    last_viewed_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='%(app_label)s_%(class)s_last_viewed_by')
    
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created_on = timezone.now()
        self.modified_on = timezone.now()
        self.last_viewed_on = timezone.now()
        # print(f"saving data, {self}, {self.id}{self.modified_on} {timezone.now()}")
        return super(BaseModel, self).save(*args, **kwargs)
    class Meta:
        abstract = True