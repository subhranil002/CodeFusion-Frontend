import DashboardHeader from "../components/Dashboard/DashboardHeader";
import RoomActions from "../components/Dashboard/RoomActions";
import RoomList from "../components/Dashboard/RoomList";

function Dashboard() {
    return (
        <div className="min-h-screen bg-base-200">
            <DashboardHeader />

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
    );
}

export default Dashboard;
