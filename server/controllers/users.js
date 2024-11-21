
import User from "../models/User.js";

/* READ */
export const getUser = async (req,res) => {
try{
    const { id } = req.params;
    const user = await User.findById(id);
    req.status(200).json(user);

} catch (err) {
    res.status(400).json({message : err.message});
}
}
export const getUserFriend = async (req, res) => {
    try { 
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id)=> User.findById(id))
    );
    const formattedfriends = friends.map(
        ({ _id, FirstName, LastName, PicturePath, occupations,location }) =>{
            return {_id, FirstName, LastName, PicturePath, occupations,location };
        }
    );
    res.status(200).json(formattedfriends);
} catch (err) {
    res.status(400).json({message : err.message});
}
};

/* UPDATE */

export const addremoveFriend = async (req,res) => {
    try{
        const {id , friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)){
            user.freinds = user.friends.filter((id) => id !== friendId);
            friend.freinds = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );
        const formattedfriends = friends.map(
            ({ _id, FirstName, LastName, PicturePath, occupations,location }) =>{
                return {_id, FirstName, LastName, PicturePath, occupations,location };
            }
        ); 
        res.status(200).json(formattedfriends);  

    } catch (err) {
        res.status(400).json({message : err.message});
    }
} 