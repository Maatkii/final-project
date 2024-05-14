import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { admin_get_freelancers } from "../../../redux/actions/adminAction";
const FreelancerList = () => {
  const { freelancerList } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(admin_get_freelancers());
  }, []);
  return (
    <div className="">
      <div class="col-xl-12 col-md-12">
        <div class="section-headline margin-bottom-30">
          <h4>Freelancer List</h4>
        </div>
        <table class="basic-table">
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>

            {freelancerList?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={el.avatar} alt="" className="user-avatar" />
                  </td>
                  <td>
                    {el.firstName}
                    {el.lastName}
                  </td>
                  <td>{el.email}</td>
                  <td>{el.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FreelancerList;
