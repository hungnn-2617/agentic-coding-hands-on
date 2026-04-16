# Reference Viewpoints - Login Screen

## Source: Login > Design of Login screen

| Viewpoint | Expected Result |
| --------- | --------------- |
| Check display of screen: Header, Title, Footer, Layout of items, State of each items | Same as the designed spec |

## Source: Login > Login by Google account

| Viewpoint | Expected Result |
| --------- | --------------- |
| First time login when registered account is logging Google | Can login successfully even if not input username/password |
| First time login when other account is logging Google | Handle auto login or cannot login based on spec |
| First time login when not logged into Google by any user (PC) | Display Google login screen. Can login successfully after login Google by registered account |
| First time login by Google account but not added any GG account to device (Mobile) | Display Google login screen. Can login successfully after login Google by registered account |
| Next time login: not expired token + registered account logging Google | Auto login by registered account |
| Next time login: not expired token + registered account not logging Google | Auto login by registered account |
| Next time login: expired token + registered account logging Google | Cannot auto login. Display login page. Can login successfully |
| Next time login: expired token + registered account not logging Google | Cannot auto login. Display login page. Can login successfully |
| Next time login after clear cookies of browser | Cannot auto login. Display login page. Can login successfully |
| Next time login after logout | Cannot auto login. Display login page. Can login successfully |
| Next time login on another web browser | Cannot auto login. Display login page. Can login successfully |

## Source: Login > Other cases

| Viewpoint | Expected Result |
| --------- | --------------- |
| Login on multi devices | Can login/cannot login based on spec |
| Login by special account: Deleted/Inactive/Blocked account | Cannot login. Display corresponding error message |
