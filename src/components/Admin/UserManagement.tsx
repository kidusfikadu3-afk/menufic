const UserManagement = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/admin/users');
    const data = await response.json();
    setUsers(data);
  };

  const transferOwnership = async (restaurantId, newUserId) => {
    await fetch('/api/admin/transfer-ownership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId, newUserId })
    });
    fetchUsers(); // Refresh data
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="grid gap-4">
        {users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onTransferOwnership={transferOwnership}
          />
        ))}
      </div>
    </div>
  );
};