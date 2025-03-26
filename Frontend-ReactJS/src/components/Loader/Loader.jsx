/**
 * ABOUT
 * The Loader component display should be managed using redux.
 * 
 * Example (from within a component):
 * const dispatch = useDispatch();
 * dispatch(setLoader(true)) // loader will be displayed
 * //make api call
 * dispatch(setLoader(false)) // loader will be hidden
 */

import "./loader.css";

export default function Loader() {
 return (
  <div className="Loader">
   <div className="Loader-spinner">
   </div>
  </div>
 );
}