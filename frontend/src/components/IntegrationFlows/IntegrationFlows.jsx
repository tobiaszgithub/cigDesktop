import { useEffect, useState } from "react";
import { GetFlowsOfIntegrationPackage } from "../../../wailsjs/go/main/App";
import { Space, Table, Tag, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const IntegrationFlows = ({ integrationPackageId }) => {

  const [flows, setFlows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState([])
  const { tenantKey } = useParams();

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'id',
      render: (id) => (
        <Link to={`/tenants/${tenantKey}/packages/${integrationPackageId}/integrationFlows/${id}`}>
          {id}
        </Link>
      ),
      filters: filters,
      filterSearch: true,
      onFilter: (value, record) => record.Id.indexOf(value) === 0,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
      onFilter: (value, record) => record.Name.indexOf(value) === 0,

    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'PackageId',
      dataIndex: 'PackageId',
      key: 'packageId',
    },
    {
      title: 'Version',
      dataIndex: 'Version',
      key: 'version',
    },
  ];

  useEffect(() => {
    const getFlows = async () => {
      setIsLoading(true);

      const flows = await GetFlowsOfIntegrationPackage(
        integrationPackageId
      );

      setFlows(flows);

      setFilters(flows.map(item => {
        const key = item.Id.split(' ')[0]
        return {
          text: key,
          value: key
        }
      }))

      setIsLoading(false);
      console.log("integraion flows:")
      console.log(flows)
    };
    getFlows();
  }, [integrationPackageId]);

  return (
    <>
      <Spin tip="Loading" spinning={isLoading}>
        <Table columns={columns} dataSource={flows} />
      </Spin>

    </>
  );
};


export default IntegrationFlows;