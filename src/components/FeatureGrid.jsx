export default function FeatureGrid({ features }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-3">Fonctionnalités</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
