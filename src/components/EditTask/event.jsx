import React from 'react';
import { format } from 'date-fns';
import { Input } from '../Input';

const Event = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      onChange(name, e.target.checked);
    } else if (type === 'date') {
      onChange(name, value ? new Date(value).toISOString() : null);
    } else {
      onChange(name, value);
    }
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy-MM-dd') : '';
  };

  // Group related fields
  const groupFields = (data) => {
    const groups = {
      group1: ['pts_id', 'received', 'revised'],
      group2: ['pre_accept', 'accepted', 'login_complete'],
      group3: ['date_back_from_sce', 'assigned_date', 'pts_milestone'],
      group4: ['ew_imported_s5', 'sd_published_on_the_web_s5', 'ew_imported_s200'],
      group5: ['sd_published_on_the_web_s200', 'sd_published_on_the_web_s250', 'sd_published_on_the_web_s300'],
    };

    return Object.entries(groups).map(([groupKey, fields]) => ({
      groupKey,
      fields: fields.map(field => ({
        key: field,
        value: data[field]
      })).filter(({ value }) => value !== undefined)
    }));
  };

  const groupedFields = groupFields(data);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-6">Event Details</h2>

      {/* ID and Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <Input
            type="text"
            name="pts_id"
            value={data.pts_id || ''}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sce_returned_status"
              checked={data.sce_returned_status || false}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">SCE Returned</span>
          </div>
        </div>
      </div>

      {/* Grouped Fields Sections */}
      {groupedFields.map(({ groupKey, fields }) => (
        <div key={groupKey} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields.map(({ key, value }) => (
            <div key={key} className="space-y-2">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <Input
                type={key.includes('date') || key.includes('At') ? 'date' : 'text'}
                id={key}
                name={key}
                value={key.includes('date') || key.includes('At') ? formatDate(value) : value}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      ))}

      {/* Completion Details */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Completion Details</label>
        <Input
          type="text"
          name="on_completion"
          value={data.on_completion || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Event;

