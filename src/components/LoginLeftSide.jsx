import loginImage from "../assets/login_image.png";


function LoginLeftSide() {
  return (
    <aside className="flex flex-col   flex-1">
      <div className="flex flex-col  justify-evenly h-full">
        {/* Branding */}
        <header className="flex flex-col text-center gap-4 ">
          <div className="flex flex-col   ">
            <h1 className="text-primary text-[35px]">{"</>"}</h1>

            <h1 className="text-base-content text-[40px]">
              Dev<span className="text-primary">Catchup</span>
            </h1>
          </div>

          <div className="text-[#A9A9A9]  text-xl tracking-widest">
            <p className="text-lg leading-6 tracking-widest">
              Connect with developers
            </p>
            <p className="text-lg leading-6 tracking-widest">
              Build your network
            </p>
          </div>
        </header>

        {/* Illustration */}
        <figure className="">
          <img
            src={loginImage}
            alt="Developer networking illustration"
            className=""
          />
        </figure>
      </div>
    </aside>
  );
}

export default LoginLeftSide;
