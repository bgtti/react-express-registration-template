function Terms() {
 const numberOfSections = 3;
 const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

 return (
  <section className="Main-Section">
   <h1>Terms of service</h1>

   {[...Array(numberOfSections)].map((_, i) => (
    <div className="Main-Text-Container" key={i}>
     <p><b>Terms of service part {i + 1}.</b></p>
     <p>{content}</p>
    </div>
   ))}
  </section>
 );
}

export default Terms;