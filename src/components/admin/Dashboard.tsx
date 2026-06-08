import {
  Calendar,
  Eye,
  FileText,
  TrendingUp,
  Users,
  Newspaper,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for cards
  const statsCards = [
    {
      title: "Total Articles",
      value: "1,284",
      change: "+12%",
      trend: "up",
      icon: Newspaper,
      color: "primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      title: "Total Views",
      value: "84.2K",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      color: "meta-3",
      bgColor: "bg-meta-3/10",
      textColor: "text-meta-3",
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      color: "meta-5",
      bgColor: "bg-meta-5/10",
      textColor: "text-meta-5",
    },
    {
      title: "Pending Reviews",
      value: "23",
      change: "-2",
      trend: "down",
      icon: Clock,
      color: "meta-6",
      bgColor: "bg-meta-6/10",
      textColor: "text-meta-6",
    },
  ];

  const recentArticles = [
    {
      id: 1,
      title: "Breaking: Major Political Development Unfolds",
      author: "Sarah Johnson",
      category: "Politics",
      views: "12.4K",
      status: "published",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Tech Giant Announces Revolutionary AI Platform",
      author: "Michael Chen",
      category: "Technology",
      views: "8.7K",
      status: "published",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Economy Shows Strong Growth in Q4",
      author: "David Williams",
      category: "Business",
      views: "5.2K",
      status: "draft",
      date: "2024-01-13",
    },
    {
      id: 4,
      title: "New Health Guidelines Released by WHO",
      author: "Emily Brown",
      category: "Health",
      views: "3.9K",
      status: "pending",
      date: "2024-01-12",
    },
  ];

  const pendingComments = [
    {
      id: 1,
      author: "JohnDoe_92",
      comment: "This is an insightful article about current events...",
      article: "Breaking: Major Political Development Unfolds",
      time: "2 hours ago",
    },
    {
      id: 2,
      author: "Traveler_Anna",
      comment: "Great coverage of the tech event! Looking forward to more...",
      article: "Tech Giant Announces Revolutionary AI Platform",
      time: "4 hours ago",
    },
    {
      id: 3,
      author: "EcoWarrior",
      comment: "Important discussion about environmental policies...",
      article: "New Health Guidelines Released by WHO",
      time: "6 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray p-6 font-satoshi">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-title-xl2 font-bold text-black">Admin Dashboard</h1>
        <p className="text-body mt-1">Welcome back! Here's what's happening with your news portal today.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border border-stroke bg-white p-6 shadow-default transition-all duration-300 hover:shadow-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-title-sm font-medium text-bodydark2">{stat.title}</p>
                <p className="text-title-xxl font-bold text-black mt-2">{stat.value}</p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-meta-3" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-meta-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-meta-3" : "text-meta-1"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-body text-sm">vs last week</span>
                </div>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics Section */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Content Overview Card */}
        <div className="rounded-lg border border-stroke bg-white p-6 shadow-default">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-title-md font-semibold text-black">Content Overview</h2>
            <button className="text-body hover:text-primary transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-body font-medium">Published Articles</span>
                <span className="text-title-sm font-bold text-black">847</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-2">
                <div className="h-2.5 w-[68%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-body font-medium">Pending Approval</span>
                <span className="text-title-sm font-bold text-black">23</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-2">
                <div className="h-2.5 w-[12%] rounded-full bg-meta-6"></div>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-body font-medium">Draft Articles</span>
                <span className="text-title-sm font-bold text-black">156</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-2">
                <div className="h-2.5 w-[18%] rounded-full bg-meta-5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="rounded-lg border border-stroke bg-white p-6 shadow-default">
          <h2 className="text-title-md mb-4 font-semibold text-black">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-2 rounded-lg border border-stroke bg-gray p-4 transition-all hover:border-primary hover:bg-white">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-black">Write Article</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border border-stroke bg-gray p-4 transition-all hover:border-primary hover:bg-white">
              <Users className="h-8 w-8 text-meta-5" />
              <span className="text-sm font-medium text-black">Manage Users</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border border-stroke bg-gray p-4 transition-all hover:border-primary hover:bg-white">
              <MessageSquare className="h-8 w-8 text-meta-3" />
              <span className="text-sm font-medium text-black">Moderate Comments</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-lg border border-stroke bg-gray p-4 transition-all hover:border-primary hover:bg-white">
              <TrendingUp className="h-8 w-8 text-meta-6" />
              <span className="text-sm font-medium text-black">Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Articles and Comments Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Articles Table */}
        <div className="rounded-lg border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-semibold text-black">Recent Articles</h2>
              <button className="text-primary text-sm font-medium hover:underline">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left">
                  <th className="px-6 py-3 text-sm font-medium text-black">Title</th>
                  <th className="px-6 py-3 text-sm font-medium text-black">Author</th>
                  <th className="px-6 py-3 text-sm font-medium text-black">Views</th>
                  <th className="px-6 py-3 text-sm font-medium text-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article) => (
                  <tr key={article.id} className="border-b border-stroke">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-black">{article.title}</p>
                      <p className="text-xs text-body">{article.category}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-body">{article.author}</td>
                    <td className="px-6 py-4 text-sm text-body">{article.views}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          article.status === "published"
                            ? "bg-meta-3/10 text-meta-3"
                            : article.status === "draft"
                            ? "bg-meta-5/10 text-meta-5"
                            : "bg-meta-6/10 text-meta-6"
                        }`}
                      >
                        {article.status === "published" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {article.status === "draft" && <Clock className="mr-1 h-3 w-3" />}
                        {article.status === "pending" && <AlertCircle className="mr-1 h-3 w-3" />}
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
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
              <h2 className="text-title-md font-semibold text-black">Pending Comments</h2>
              <button className="text-primary text-sm font-medium hover:underline">
                Moderate All
              </button>
            </div>
          </div>
          <div className="divide-y divide-stroke">
            {pendingComments.map((comment) => (
              <div key={comment.id} className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-black">{comment.author}</span>
                  </div>
                  <span className="text-xs text-body">{comment.time}</span>
                </div>
                <p className="text-sm text-body mb-2">{comment.comment}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-bodydark2">On: {comment.article}</p>
                  <div className="flex gap-2">
                    <button className="rounded bg-meta-3/10 px-3 py-1 text-xs font-medium text-meta-3 transition-colors hover:bg-meta-3/20">
                      Approve
                    </button>
                    <button className="rounded bg-meta-1/10 px-3 py-1 text-xs font-medium text-meta-1 transition-colors hover:bg-meta-1/20">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info Card */}
      <div className="mt-8 rounded-lg border border-stroke bg-whiter p-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm text-body">
              Last updated: Today at 10:30 AM
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-meta-3"></div>
              <span className="text-xs text-body">System Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-meta-6"></div>
              <span className="text-xs text-body">Auto-backup Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;