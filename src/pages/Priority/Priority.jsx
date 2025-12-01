import React from 'react';
import merchant from '../../assets/be-a-merchant-bg.png'
import location from '../../assets/location-merchant.png'

const Priority = () => {
    return (
      <div
        style={{
          backgroundImage: `url(${merchant})`,
          backgroundRepeat: "no-repeat",
        //   backgroundImage: `url(${location})`,
          //   backgroundPosition: "e",
        }}
        className="bg-secondary p-20 rounded-2xl mt-20 flex justify-between"
      >
        <div className=" space-y-6 max-w-xl">
          <h2 className=" text-white text-4xl font-extrabold">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-zinc-300 text-base font-normal">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="space-x-6">
            <button className="px-8 py-4 bg-lime-300 rounded-[99px] text-stone-900 font-bold text-xl shadow-sm">
              Track Your Parcel
            </button>
            <button className="px-8 py-4 border text-white border-lime-300 hover:bg-lime-300 rounded-[99px] hover:text-stone-900 transition-colors font-bold text-xl shadow-sm">
              Track Your Parcel
            </button>
          </div>
            </div>
            <div className="">
                <img src={location} alt="" />
            </div>
      </div>
    );
};

export default Priority;