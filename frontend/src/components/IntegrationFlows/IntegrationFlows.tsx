import { useEffect, useState } from "react";
import { GetFlowsOfIntegrationPackage } from "../../../wailsjs/go/main/App";
import { Space, Table, Tag, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { model } from "../../../wailsjs/go/models";
import { ColumnFilterItem } from "antd/es/table/interface";

type IntegrationFlowsProps = {
  integrationPackageId: string,
}

const IntegrationFlows = ({ integrationPackageId }: IntegrationFlowsProps) => {

  const [flows, setFlows] = useState(Array<model.IntegrationFlow>);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(Array<ColumnFilterItem>)
  const { tenantKey } = useParams();

  const columns: ColumnsType<model.IntegrationFlow> = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'id',
      width: 300,
      render: (id: string) => (
        <Link to={`/tenants/${tenantKey}/packages/${integrationPackageId}/integrationFlows/${id}`}>
          {id}
        </Link>
      ),
      filters: filters,
      filterSearch: true,
      onFilter: (value, record) => record.Id.indexOf(value as string) === 0,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
      width: 300,
      onFilter: (value, record) => record.Name.indexOf(value as string) === 0,

    },

    // {
    //   title: 'PackageId',
    //   dataIndex: 'PackageId',
    //   key: 'packageId',
    // },
    {
      title: 'Version',
      dataIndex: 'Version',
      key: 'version',
      width: 80,
    },
    {
      title: 'CreatedBy',
      dataIndex: 'CreatedBy',
      key: 'CreatedBy',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (timestamp: string) => {
        let date: Date = new Date(parseInt(timestamp));
        return <div>
          {date.toISOString().slice(0, 10)}
        </div>;
      },
    },
    {
      title: 'ModifiedBy',
      dataIndex: 'ModifiedBy',
      key: 'ModifiedBy',
    },
    {
      title: 'ModifiedAt',
      dataIndex: 'ModifiedAt',
      key: 'ModifiedAt',
      render: (timestamp: string) => {
        let date: Date = new Date(parseInt(timestamp));
        return <div>
          {date.toISOString().slice(0, 10)}
        </div>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.}</a> */}
          <Link to={`/tenants/${tenantKey}/packages/${integrationPackageId}/integrationFlows/${record.Id}?action=transport`}>
            Transport
          </Link>
          
        </Space>
      )
    }

  ];

  useEffect(() => {
    const getFlows = async () => {
      setIsLoading(true);

      const flows = await GetFlowsOfIntegrationPackage(
        integrationPackageId
      );

      setFlows(flows);

      setFilters(flows.map(item => {
        const key = item.Id;
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
        <Table columns={columns} dataSource={flows} pagination={{ pageSize: 50 }} />
      </Spin>

    </>
  );
};


export default IntegrationFlows;