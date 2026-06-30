function UserCard({ user={} }) {
 
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card h-[500px] bg-base-100 w-62 shadow-xl">
      <figure className="w-full h-[250px]">
        <img src={photoUrl} alt="Shoes" className="h-full w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
