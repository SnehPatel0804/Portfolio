from django.db import models
from datetime import date
from django.utils.text import slugify
# Create your models here.

class Role(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=150)  # UI/UX Designer & Web Developer
    image = models.ImageField(upload_to="profile/", blank=True, null=True)

    birthday = models.DateField(blank=True, null=True)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)

    # age = models.PositiveIntegerField(blank=True, null=True)
    degree = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    freelance = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

    @property
    def age(self):
        if not self.birthday:
            return None
        today = date.today()
        return today.year - self.birthday.year - (
            (today.month, today.day) < (self.birthday.month, self.birthday.day)
        )


class Resume(models.Model):
    summary_name = models.CharField(max_length=100)
    summary_text = models.TextField()
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    resume_file = models.FileField(upload_to="resume/")

    def __str__(self):
        return self.summary_name


class Education(models.Model):
    degree = models.CharField(max_length=150)
    year = models.CharField(max_length=20)
    institute = models.CharField(max_length=200)
    description = models.TextField()


class Experience(models.Model):
    title = models.CharField(max_length=150)
    year = models.CharField(max_length=20)
    company = models.CharField(max_length=200)
    points = models.TextField(help_text="Use line breaks")


    



class Project(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.CharField(max_length=100)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Certificate(models.Model):
    title = models.CharField(max_length=200, unique=True)
    issue_date = models.DateField(null=True, blank=True)
    issuer = models.CharField(max_length=150, null=True, blank=True) 
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.CharField(max_length=100)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
