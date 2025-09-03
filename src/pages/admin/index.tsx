import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "SUPER_ADMIN") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  if (status === "loading") return <div>Loading...</div>;
  
  if (session?.user.role !== "SUPER_ADMIN") {
    return <div>Access denied. Super admin required.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p>Manage all users and their roles</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Manage Users
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Restaurant Management</h2>
          <p>View and manage all restaurants</p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            View All Restaurants
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Analytics</h2>
          <p>View system usage statistics</p>
          <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded">
            View Analytics
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Activity Logs</h2>
          <p>Monitor all admin activities</p>
          <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
            View Logs
          </button>
        </div>
      </div>
    </div>
  );
}