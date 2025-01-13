import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Event from "./event";
import Milestone from "./milestone";
import ArticleMeta from "./ArticleMeta";
import axios from "axios";

function EditTask() {
  const location = useLocation();
  const [formData, setFormData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState();

  const navigationData = location.state?.data;

  useEffect(() => {
    if (navigationData && navigationData.length > 0) {
      setFormData(navigationData);
    }
  }, [navigationData]);

  const handleFormDataChange = (index, field, value) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  if (formData.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/article/updatearticle`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        setError(error?.response?.data?.status);
      });
  };

  const handleCancel = () => {};

  const { event, milestone, miscellaneous_info, ...article_meta } = formData[0];

  return (
    <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 w-full h-[90vh] overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>
          <div className="space-y-6">
            <Event
              data={event}
              onChange={(field, value) =>
                handleFormDataChange(0, "event", { ...event, [field]: value })
              }
            />
          </div>
          <div className="border-t border-gray-200 pt-6">
            <Milestone
              data={milestone}
              onChange={(field, value) =>
                handleFormDataChange(0, "milestone", {
                  ...milestone,
                  [field]: value,
                })
              }
            />
          </div>
          <div className="border-t border-gray-200 pt-6">
            <ArticleMeta
              data={article_meta}
              onChange={(field, value) => handleFormDataChange(0, field, value)}
            />
          </div>
          {error && <p className="mt-4 text-red-600">{error}</p>}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                handleSubmit();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
