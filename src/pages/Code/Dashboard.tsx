import RoomActions from "../../components/Dashboard/RoomActions";
import RoomList from "../../components/Dashboard/RoomList";
import HomeLayout from "../../layouts/HomeLayout";

function Dashboard() {
    return (
        <HomeLayout>
            <div className="min-h-screen bg-base-200">
                <main className="container mx-auto px-4 py-8">
                    <div className="space-y-8">
                        {/* Room Actions */}
                        <section>
                            <RoomActions />
                        </section>

                        {/* Room List */}
                        <section>
                            <RoomList />
                        </section>
                    </div>
                </main>
            </div>
        </HomeLayout>
    );
}

export default Dashboard;
