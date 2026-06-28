function UserCard({ user }) {
  console.log("feeduser", typeof user);

  return (
    <div className="card bg-base-100 w-62 shadow-xl">
      <figure className="w-full h-[250px]">
        <img src={user?.photoUrl} alt="Shoes"  className="h-full w-full"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
       {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
        <p>{user?.about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
