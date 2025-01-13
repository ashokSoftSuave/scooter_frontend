import React from 'react';

function EditThree({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Schedule Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Speed Target</label>
          <input
            type="date"
            name="speed_target"
            value={data.speed_target}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">On Date</label>
          <input
            type="date"
            name="on_date"
            value={data.on_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Embargo Exp</label>
          <input
            type="datetime-local"
            name="embargo_exp"
            value={data.embargo_exp ? data.embargo_exp.slice(0, 16) : ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Embargo Stage</label>
          <input
            type="text"
            name="embargo_stg"
            value={data.embargo_stg}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Article S300 Date</label>
          <input
            type="date"
            name="article_s300_date"
            value={data.article_s300_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Holdout</label>
          <input
            type="date"
            name="item_holdout"
            value={data.item_holdout}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Finalizing</label>
          <input
            type="date"
            name="item_finalizing"
            value={data.item_finalizing}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
}

export default EditThree;

