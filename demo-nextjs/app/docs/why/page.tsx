
export default function WhyPage() {
  return (
    <div className="max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Why Countries Cities AR?</h1>
      <p className="text-lg text-gray-400 mb-8">
        A comprehensive solution for managing world geographic data with full Arabic support
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">The Problem</h2>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <p className="text-gray-300">
              Most geographic libraries lack proper Arabic support, especially for Arab countries' administrative divisions.
              Developers often struggle with:
            </p>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li>• Incomplete or inaccurate Arabic translations</li>
              <li>• Missing governorates and provinces for Arab countries</li>
              <li>• Large bundle sizes with unnecessary data</li>
              <li>• Poor TypeScript support</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Solution</h2>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-gray-300 mb-3">
              Countries Cities AR provides:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>✅ <strong className="text-green-400">100% accurate Arabic translations</strong> for all Arab countries</li>
              <li>✅ <strong className="text-green-400">Complete coverage</strong>: 250 countries, 4,642 states/provinces</li>
              <li>✅ <strong className="text-green-400">TypeScript first</strong> with full type definitions</li>
              <li>✅ <strong className="text-green-400">Optimized bundle</strong>: Only 586KB for the entire world</li>
              <li>✅ <strong className="text-green-400">Tree-shakeable</strong>: Import only what you need</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-800 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-500/5 transition-all">
              <h3 className="font-semibold text-white mb-2">🛒 E-commerce</h3>
              <p className="text-sm text-gray-400">
                Shipping addresses, delivery zones, regional pricing
              </p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4 hover:border-green-500 hover:bg-green-500/5 transition-all">
              <h3 className="font-semibold text-white mb-2">🏛️ Government Services</h3>
              <p className="text-sm text-gray-400">
                Citizen registration, service localization, statistics
              </p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4 hover:border-purple-500 hover:bg-purple-500/5 transition-all">
              <h3 className="font-semibold text-white mb-2">📊 Analytics</h3>
              <p className="text-sm text-gray-400">
                Geographic data visualization, regional reports
              </p>
            </div>
            <div className="border border-gray-800 rounded-lg p-4 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all">
              <h3 className="font-semibold text-white mb-2">🌍 Multi-language Apps</h3>
              <p className="text-sm text-gray-400">
                International applications with proper localization
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-white">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-400">Countries Cities AR</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-500">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 px-4 text-gray-300">Arabic Support</td>
                  <td className="py-3 px-4 text-center text-green-400">✅ 100%</td>
                  <td className="py-3 px-4 text-center text-red-400">❌ Partial</td>
                </tr>
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 px-4 text-gray-300">TypeScript</td>
                  <td className="py-3 px-4 text-center text-green-400">✅ Full Types</td>
                  <td className="py-3 px-4 text-center text-yellow-400">⚠️ Basic</td>
                </tr>
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 px-4 text-gray-300">Bundle Size</td>
                  <td className="py-3 px-4 text-center text-green-400">✅ 586KB</td>
                  <td className="py-3 px-4 text-center text-red-400">❌ 2-5MB</td>
                </tr>
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 px-4 text-gray-300">Tree Shaking</td>
                  <td className="py-3 px-4 text-center text-green-400">✅ Yes</td>
                  <td className="py-3 px-4 text-center text-red-400">❌ No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
