const UserCard = ({ user, onTransferOwnership }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <span className={`px-2 py-1 rounded text-xs ${
            user.role === 'SUPER_ADMIN' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {user.role}
          </span>
        </div>
        
        {user.restaurants.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Restaurants:</h4>
            {user.restaurants.map(restaurant => (
              <div key={restaurant.id} className="flex items-center justify-between mb-2">
                <span>{restaurant.name}</span>
                <TransferDropdown 
                  restaurant={restaurant}
                  currentOwner={user}
                  onTransfer={onTransferOwnership}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};