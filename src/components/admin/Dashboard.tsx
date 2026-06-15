import {
  Eye,
  Newspaper,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Crown,
  DollarSign,
  Activity,
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for cards - Simplified
  const statsCards = [
    {
      title: 'Total Articles',
      value: '1,284',
      icon: Newspaper,
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      title: 'Total Views',
      value: '84.2K',
      icon: Eye,
      bgColor: 'bg-meta-3/10',
      textColor: 'text-meta-3',
    },
    {
      title: "Today's Views",
      value: '2,847',
      icon: Activity,
      bgColor: 'bg-meta-5/10',
      textColor: 'text-meta-5',
    },
    {
      title: 'Pending Review',
      value: '23',
      icon: Clock,
      bgColor: 'bg-meta-6/10',
      textColor: 'text-meta-6',
    },
    {
      title: 'Premium Members',
      value: '1,247',
      icon: Crown,
      bgColor: 'bg-meta-5/10',
      textColor: 'text-meta-5',
    },
    {
      title: 'Total Earnings',
      value: '$12,847',
      icon: DollarSign,
      bgColor: 'bg-meta-3/10',
      textColor: 'text-meta-3',
    },
  ];

  const recentArticles = [
    {
      id: 1,
      title: 'Breaking: Major Political Development Unfolds',
      author: 'Sarah Johnson',
      category: 'Politics',
      views: '12.4K',
      status: 'published',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Tech Giant Announces Revolutionary AI Platform',
      author: 'Michael Chen',
      category: 'Technology',
      views: '8.7K',
      status: 'published',
      date: '2024-01-14',
    },
    {
      id: 3,
      title: 'Economy Shows Strong Growth in Q4',
      author: 'David Williams',
      category: 'Business',
      views: '5.2K',
      status: 'draft',
      date: '2024-01-13',
    },
    {
      id: 4,
      title: 'New Health Guidelines Released by WHO',
      author: 'Emily Brown',
      category: 'Health',
      views: '3.9K',
      status: 'pending',
      date: '2024-01-12',
    },
  ];

  const pendingComments = [
    {
      id: 1,
      author: 'JohnDoe_92',
      comment: 'This is an insightful article about current events...',
      article: 'Breaking: Major Political Development Unfolds',
      time: '2 hours ago',
    },
    {
      id: 2,
      author: 'Traveler_Anna',
      comment: 'Great coverage of the tech event! Looking forward to more...',
      article: 'Tech Giant Announces Revolutionary AI Platform',
      time: '4 hours ago',
    },
    {
      id: 3,
      author: 'EcoWarrior',
      comment: 'Important discussion about environmental policies...',
      article: 'New Health Guidelines Released by WHO',
      time: '6 hours ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray p-6 font-satoshi">
      {/* Stats Cards - All in one horizontal line */}
      <div className="mb-8 ">
        <div className="flex gap-6 min-w-max">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="group w-64 flex-shrink-0 rounded-lg border border-stroke bg-white p-5 shadow-default transition-all duration-300 hover:shadow-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-bodydark2">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-title-xxl font-bold text-black">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Articles and Comments Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Articles Table */}
        <div className="rounded-lg border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-semibold text-black">
                Recent Articles
              </h2>
              <button className="text-sm font-medium text-primary hover:underline">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left">
                  <th className="px-6 py-3 text-sm font-medium text-black">
                    Title
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-black">
                    Author
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-black">
                    Views
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-black">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article) => (
                  <tr key={article.id} className="border-b border-stroke">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-black">
                        {article.title}
                      </p>
                      <p className="text-xs text-body">{article.category}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-body">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-body">
                      {article.views}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          article.status === 'published'
                            ? 'bg-meta-3/10 text-meta-3'
                            : article.status === 'draft'
                              ? 'bg-meta-5/10 text-meta-5'
                              : 'bg-meta-6/10 text-meta-6'
                        }`}
                      >
                        {article.status === 'published' && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
                        {article.status === 'draft' && (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {article.status === 'pending' && (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        )}
                        {article.status.charAt(0).toUpperCase() +
                          article.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Comments Card */}
        <div className="rounded-lg border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-semibold text-black">
                Pending Comments
              </h2>
              <button className="text-sm font-medium text-primary hover:underline">
                Moderate All
              </button>
            </div>
          </div>
          <div className="divide-y divide-stroke">
            {pendingComments.map((comment) => (
              <div key={comment.id} className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-medium text-black text-sm">
                      {comment.author}
                    </span>
                  </div>
                  <span className="text-xs text-body">{comment.time}</span>
                </div>
                <p className="mb-2 text-sm text-body line-clamp-2">
                  {comment.comment}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-bodydark2 truncate max-w-[200px]">
                    On: {comment.article}
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded bg-meta-3/10 px-2 py-0.5 text-xs font-medium text-meta-3 transition-colors hover:bg-meta-3/20">
                      Approve
                    </button>
                    <button className="rounded bg-meta-1/10 px-2 py-0.5 text-xs font-medium text-meta-1 transition-colors hover:bg-meta-1/20">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;