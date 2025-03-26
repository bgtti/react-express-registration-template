import { logOutDeletedUser } from "../../apis/handlers/deleteUserLogout";
/**
 * Component returns a page confirming the user's account was deleted.
 * 
 * It logs the user out from the redux store.
 * 
 * @returns {React.ReactElement}
 * 
 */
function AccountDeleted() {
 logOutDeletedUser();

 return (
  <section class="Main-Section">
   {/* <Helmet>
    <title>Account Deleted</title>
    <meta name="robots" content="noindex, nofollow" />
   </Helmet> */}
   <h1>Account deleted</h1>
   <br />
   <p><b>Your account was deleted successfully!</b></p>
   <br />
   <p>We are sorry to see you go and wish you all the best!</p>
  </section>
 );
}

export default AccountDeleted;