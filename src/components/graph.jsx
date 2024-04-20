import { BarChart, Bar , XAxis ,YAxis } from 'recharts';
function Histogramme ({data}) {
    return <BarChart
    width={1200}
    height={600}
    data={data}
    margin={{ top: 20, right: 20, bottom: 30, left: 30 }}
    className=" mx-auto my-4"
  >
  <XAxis dataKey="name" stroke="#8884d8" />
  <YAxis />
    <Bar dataKey="value" fill='#50C878'/>
  </BarChart>
}
export default Histogramme;