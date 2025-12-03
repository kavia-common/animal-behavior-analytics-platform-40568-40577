import { useNavigate } from "react-router-dom";
import anteater from "../../assets/vizai-logo.png"; // Placeholder image; replace with real photo if provided.
import { useDispatch } from "react-redux";
import { setSelectedAnimal } from "../../store/slices/animalSlice";

const cardStyle = { borderColor: "var(--color-grey-border)" };

function ComingSoonCard({ name }: { name: string }) {
  return (
    <div className="card p-5 opacity-60">
      <div className="h-28 bg-gray-100 rounded-lg mb-4" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold" style={{ color: "var(--color-teal-dark-text)" }}>{name}</div>
          <div className="text-sm" style={{ color: "var(--color-faint-text)" }}>Coming Soon</div>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function AnimalSelectionPage() {
  /** Shows Giant Anteater card and future animals as coming soon. */
  const nav = useNavigate();
  const dispatch = useDispatch();

  const onViewDashboard = () => {
    dispatch(setSelectedAnimal({ id: "anteater-001", name: "Giant Anteater", species: "Myrmecophaga tridactyla", age_years: 7, tags: ["Active"] } as any));
    nav("/dashboard");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-teal-dark-text)" }}>Select an Animal</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-5" style={cardStyle as any}>
          <img src={anteater} alt="Giant Anteater" className="h-40 w-full object-contain bg-[var(--color-teal-light)] rounded-lg mb-4" />
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold" style={{ color: "var(--color-teal-dark-text)" }}>Giant Anteater</div>
              <div className="text-sm" style={{ color: "var(--color-faint-text)" }}>Age: 7 • Sex: F • Enclosure: A-12</div>
              <div className="mt-2">
                <span className="badge badge--processing">Active</span>
              </div>
              <div className="text-xs mt-2" style={{ color: "var(--color-faint-text)" }}>Last updated 2m ago</div>
            </div>
          </div>
          <button
            className="mt-4 px-4 py-2 rounded-lg font-medium"
            style={{ background: "var(--color-teal-primary)", color: "#fff" }}
            onClick={onViewDashboard}
          >
            View Dashboard
          </button>
        </div>

        <ComingSoonCard name="African Elephant" />
        <ComingSoonCard name="Siberian Tiger" />
      </div>
    </div>
  );
}
