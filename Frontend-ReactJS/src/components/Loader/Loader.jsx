import "./loader.css";

/**
 * Component returns div with a spinning loader.
 * 
 * The Loader component display should be managed using redux.
 * 
 * @example
 * //(from within a component):
 * const dispatch = useDispatch();
 * dispatch(setLoader(true)) // loader will be displayed
 * //...make api call...
 * dispatch(setLoader(false)) // loader will be hidden
 * 
 * @returns {React.ReactElement}
 */
export default function Loader() {
 return (
  <div className="Loader">
   <div className="Loader-spinner">
   </div>
  </div>
 );
}