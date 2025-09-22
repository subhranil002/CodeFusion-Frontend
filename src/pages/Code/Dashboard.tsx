import RoomActions from "../../components/Dashboard/RoomActions";
import RoomList from "../../components/Dashboard/RoomList";
import HomeLayout from "../../layouts/HomeLayout";

function Dashboard() {
    return (
        <HomeLayout>
            <RoomActions />
            <RoomList />
        </HomeLayout>
    );
}

export default Dashboard;
