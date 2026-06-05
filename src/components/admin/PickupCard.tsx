import {useFieldArray, useFormContext} from 'react-hook-form';
import GenericInputField from '../Forms/Input/GenericInputField';

type Props = {
  cityIndex: number;
  cityName: string;
};

export default function CityPickupCard({cityIndex, cityName}: Props) {
  const {control} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    control,
    name: `pickupPoints.${cityIndex}.points`,
  });

  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        {cityName}
      </h2>

      <div className="space-y-4">
        {fields.map((field, pointIndex) => (
          <div
            key={field.id}
            className="group relative grid grid-cols-12 items-start gap-3 border-b border-slate-50 pb-4 last:border-0 last:pb-0"
          >
            {/* Input Section: Spans 10 columns on mobile, 11 on desktop */}
            <div className="col-span-10 grid grid-cols-1 gap-3 sm:col-span-11 sm:grid-cols-2">
              <GenericInputField
                name={`pickupPoints.${cityIndex}.points.${pointIndex}.pointName`}
                label="Pickup Point"
                placeholder="e.g. Central Station"
              />
              <GenericInputField
                name={`pickupPoints.${cityIndex}.points.${pointIndex}.time`}
                label="Departure Time"
                type="time"
              />
            </div>

            {/* Actions Section: Vertically aligned icons */}
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 pt-7 sm:col-span-1">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(pointIndex)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                  title="Remove"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Button moved to bottom for better UX */}
      <button
        type="button"
        onClick={() => append({pointName: '', time: ''})}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-dashed border-blue-600 text-lg">
          +
        </span>
        Add another point in {cityName}
      </button>
    </div>
  );
}
