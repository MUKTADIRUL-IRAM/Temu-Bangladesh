//import axios from "axios";



const Comment = ({user}) => {
    const{user_name,date,comment,star} = user;

    return (
        <div className="flex flex-col space-y-3.5">

            <div className="flex items-center space-x-1.5">
               <div className="text-2xl font-semibold">{user_name}</div>
               <div>{date}</div>
            </div>

            <div>{star}</div>

            <div>{comment}</div>
            <hr/>
           
        </div>
    );
};

export default Comment;