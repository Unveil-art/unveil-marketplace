import { useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";
import axios from "axios";

const AccessPopIn2 = ({ accessOpen, setAccessOpen, data, i }) => {
  const el = useRef();

  const sendCrmRequest = async (e) =>{
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const website = document.querySelector('input[name="website"]').value;
    const type = document.querySelector('input[name="type-selected"]').value;
    const {data}= await axios({
      method: "POST",
      url: `https://cumbersome-furtive-fowl.strapiapp.com/api/crm`,
      data: {
        "name" : name,
        "email" : email,
        "website" : website,
        "type" : type
    },
      withCredentials: true,
    });
    if(data.status == 200){
      alert("Your request has been sent successfully");
    } else {
      console.log(data.message)
      alert("You will be notified soon");
    }
    setAccessOpen(false);
    
  }

  function changeType(params) {
    document.querySelector('input[name="type-selected"]').value = params;
  }

  useAsideAnimation(el, accessOpen);

  return (
    <section
      ref={el}
      className="fixed z-50 invisible w-full h-screen overflow-hidden"
    >
      
      <div className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-[20px] h-screen sm:h-fit">
        <div
          onClick={() => setAccessOpen(false)}
          className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
        >
          <div className="-translate-x-[1px]">
            <Close />
          </div>
        </div>
        <h3 className="mb-[15px] text-center b4">
          {data ? data.form_heading : "Join Unveil"}
        </h3>
        <h3 className="mb-[60px] text-center s2 max-w-[270px] mx-auto">
          {data ? data.heading : "Show us your work and get access to Unveil"}
        </h3>
        {/* <h4 className="mb-[20px] text-center s2 max-w-[270px] mx-auto">Your request has been sent successfully</h4> */}
        <p className="b3 leading-[16px] text-[11px] max-w-[250px]">
          {data
            ? data.description
            : "Provide a link to your work and submitting a series of works upon selection by our curator."}
        </p>
        <form className="mt-5 " onSubmit={sendCrmRequest}>
          <input type="text" required name="name" id="name" placeholder="Name" className="input" />
          <input type="email" required name="email" id="email"  placeholder="Email" className="my-1 input" />
          <input
            type="url"
            placeholder="Website (or social)"
            className="input"
            required
            id="website"
            name="website"
          />
          <p className="py-5">i&apos;m a:</p>
          <input type="hidden" id="type-selected" name="type-selected" value="artist" />
          <div className="grid grid-cols-2 pb-[15px]">
            <div>
              <input
                className="radio-block left"
                type="radio"
                name="type"
                id={`artist${i}`}
              />
              <label htmlFor={`artist${i}`} onClick={() => changeType('artist')}>Artist</label>
            </div>
            <div>
              <input
                className="radio-block right"
                type="radio"
                name="type"
                id={`gallery${i}`}
              />
              <label htmlFor={`gallery${i}`} onClick={() => changeType('gallery')}>Gallery</label>
            </div>
          </div>

          <button className="btn btn-full btn-primary btn-big" type="submit">
            Apply now
          </button>
        </form>
      </div>
      <div
        onClick={() => setAccessOpen(false)}
        className={`${
          data ? "bg-unveilGrey " : ""
        } fixed top-0 left-0 invisible w-full h-screen gsap-layer`}
      ></div>
    </section>
  );
};

export default AccessPopIn2;
