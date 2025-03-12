export default function Header({ user }) {
  return (
    <div className="bg-blue-900 text-white p-6 rounded-b-3xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2">
        {user ? `Bonjour ${user.first_name} 👋` : "Bienvenue !"}
      </h1>
      <p className="text-blue-100 text-sm">
        Votre assistant personnel pour une meilleure organisation
      </p>
    </div>
  );
}
