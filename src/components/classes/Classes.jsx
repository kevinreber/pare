import React, {useState} from 'react';
import ClassList from './ClassList';
import ClassForm from './Classform';
import './styles/Classes.css';

/** Displays a ClassList of user's Current and Past Semester classes. 
    Classes will fetch which classes to display from API and pass classes into ClassList.
*/
function Classes() {

    // State will determine what classes to show in ClassList
    const [ active, setActive ] = useState('current');
    const toggleClasses = (e) => {setActive(e.target.id); console.log(e.target.id);};

    const classList=[{name:'61a'},{name: '61b'}, {name: '61c'}, {name: 'math1a'}, {name: 'math1b'}];

	return (
		<>
        <div className="Classes-Header d-flex justify-content-around pt-2 pb-3">
            <div className="Classes-Current">
                <h5 id="current" 
                className={ active === 'current' ? 'mate-text-primary' : 'mate-text-active'}
                onClick={toggleClasses}
                >Current Semester</h5>
            </div>
            <div className="Classes-Past">
                <h5 id="past" 
                className={ active === 'past' ? 'mate-text-primary' : 'mate-text-active'}
                onClick={toggleClasses}
                >Past Semester</h5>
            </div>
        </div>
        <div className="Classes-ClassList">
            <ClassList classes={classList}/>
        </div>
        <ClassForm />
		</>
	);
}

export default Classes;