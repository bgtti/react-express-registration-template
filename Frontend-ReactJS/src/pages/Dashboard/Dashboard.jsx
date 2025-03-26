/*
TODO:
Routes: login and delete account
Name: name of user in h1
*/

function Dashboard() {
 return (
  <section class="Main-Section">

   <h1>Hi </h1>

   <div class="Main-Dashboard-Content">

    <p>
     This is your dashboard!
    </p>

    <form action="/logout" method="POST">
     <div>
      <button type="submit">Logout</button>
     </div>
    </form>

    <form action="/deleteAccount" method="POST">
     <div>
      <button class="Main-Form-Delete-Btn" type="submit">Delete account</button>
     </div>
    </form>

   </div>

  </section>
 )
}

export default Dashboard