Gabriel Malone
gmalone1@uno.edu
https://github.com/GabrielMalone/HW_3_Mobile_Apps

App name : ESURIO (I'm hungry in Latin)


SHORTCOMINGS :
------------------------------------------------------------------------------
1 - I didn't look into bottom bar navigation until it was 'too late', so I made a pseudo bottom bar navigator. You dont actually navigate to new pages, I am just using state (via reducer) to manage which components are visible at any given time. 

2 - I haven't implemented any search logic / components yet. But the card swiping sort of takes the place of this.
------------------------------------------------------------------------------
WHAT I DO HAVE:

1- API calls to google places (should just happen once per location, then gets cached)
2- API calls to Google firebase 
3- Firebase stores user data in noSQL (collection of 'users')
    document for a user looks like:
            uid: null,
            searchRadius: 1000,
            curLocation: "",
            friends : [],
            partnerData: {},
            liked: [],
            disliked: [],
            lastCardSwiped: null,
            profilePic : "",
            haveMutualPartner: false,
            peopleWaitingToBeMyPartner: [],
            matchMade : false,
            matchedID : null,
3- local data and backend data coordination
    reducer manages localRestraurantData after making initial cache or API call
    reducer manages your parnters data (uses useEffect and firebases' snapShot to listen for changes to relevant partner data (their new likes and such))
4- Favorites page that saves your right swipes
5- reusable components
    so many! 
6- some multi-user interaction (matching on restaurants/partners). 
------------------------------------------------------------------------------
HOW TO USE:

step 1 : log in with any of the accounts listed in the next section
step 2 : you shouldn't need to turn or set location services on, I hardcode the location to new orleans for this demo
step 3 : to test solo swiping (or to just see that right sipes are saved to favorites) just start siwping 
step 4 : if you want to test matching, you'd need to load another virtual phone and log in with another user. Then make sure each user has each other set as their partner. at that point you can start to swipe again (your likes should reset automatically if you were swiping prior to this).

-to log out click the gear icon
-to exit out of favorites, just tap the favorites button again
------------------------------------------------------------------------------
LOGIN INFO

user accounts on firebase:

drben@gmail.com 
gabemalone@gmail.com
test1@gmail.com
test2@gmail.com
test3@gmail.com
test4@gmail.com
test5@gmail.com
test6@gmail.com
test7@gmail.com
test8@gmail.com
test9@gmail.com
test10@gmail.com

passwords for each: 123456

------------------------------------------------------------------------------
CREDITS:

all abstract shape artwork created at: https://bookofshapes.com 
then converted to SVG: https://www.svgviewer.dev/svg-to-react-jsx
incons form https://iconify.design

------------------------------------------------------------------------------
BUGS:

Lots of things unfinished. Once a match is made, nothing really happens other than you are shown the resturant you've matched on. Touching this compenent makes it go away and likes/matches reset. Logging out should reset all of these things too. 

 - Home button does nothing
 - Clicking your own profile image brings up empty user settings page
 - radius button does nothing

I'm sure there are a ton of other bugs, most I see are the result of reloading the virtual phone without also logging out beforehand. Or logging out but the phone still has cached state data?

