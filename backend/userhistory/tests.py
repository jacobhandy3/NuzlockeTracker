from django.test import TestCase
from .models import History
from team.models import Team
from game.models import Game
from django.utils.text import slugify
from datetime import datetime
from django.core.exceptions import ValidationError

# Create your tests here.

class HistoryCreateTest(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        #get the first game
        g = Game.objects.get(id=0)
        #create 9 history samples
        for histIndex in range(9):
            title = "History" + histIndex
            History.objects.create(
                author=0,game=0,title=title,slug=slugify(title))
        #create test Team data for next entry to test build_body method

    
    #Try to add a new History entry to test limit_ten method
        #Verify Validation Error received
        

    #Create a new History entry with test team data to test build_body method
        #verify body is created correctly
        

    #Test del_team method deletes all associated members
        #verify associated team members do not exist anymore
