// import "components/studentList.scss"
import React from "react";
import StudentListItem from "./StudentListItem";


interface IProps {
	students: Istudents
}

interface Istudents {
	[index: number]: {username: string; studentrating: string}
}

export default function StudentList(props) {
	
	console.log("prop in student liss: ", props);
	
	const { students } = props;
	console.log("students in list: ", students);
	
	const studentsData = students.map((student, index) => {

		return <StudentListItem
		key={index}
		username={student.username}
		experience={student.studentrating}
		avatar={student.avatar}
		// selected={student.id === props.value}
		// setstudent={props.setstudent}
		/>
	})
		return ( 
			<section>
				<h1>Students</h1>
				<ul>{studentsData}</ul>
			</section>
		);
}