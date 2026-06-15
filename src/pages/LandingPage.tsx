// D:\NewsPortal\news-portal-F\src\pages\LandingPage.tsx

import {motion} from 'framer-motion';
import {Link} from '@tanstack/react-router';
import {Calendar, Clock, Share2, ChevronRight, Eye} from 'lucide-react';
import {useGetNewsInfo} from '@/lib/Auth/news/newsall';
import {useState, useMemo} from 'react';
import toast from 'react-hot-toast';

interface NewsArticle {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  categories: Array<{id: string; name: string}>;
  content: Array<{id: string; title: string; text: string}>;
  images: Array<{id: string; url: string}>;
  links: Array<{id: string; url: string; text: string}>;
}

function LandingPage() {
  const {data, isLoading, isError, error} = useGetNewsInfo();
  const [visibleNewsCount, setVisibleNewsCount] = useState(9);

  const allNews = data?.data?.news || data?.news || [];

  const getTodayNews = (news: NewsArticle[]) => {
    const today = new Date();
    const todayIST = new Date(
      today.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),
    );
    todayIST.setHours(0, 0, 0, 0);

    const tomorrowIST = new Date(todayIST);
    tomorrowIST.setDate(tomorrowIST.getDate() + 1);

    return news.filter((item) => {
      const publishDate = new Date(item.publishedAt);
      const publishIST = new Date(
        publishDate.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),
      );
      publishIST.setHours(0, 0, 0, 0);

      return publishIST >= todayIST && publishIST < tomorrowIST;
    });
  };

  const news = useMemo(() => getTodayNews(allNews), [allNews]);

  // Get hero news (first article)
  const heroNews = news.length > 0 ? news[0] : null;
  const remainingNews = news.slice(1);

  // Format date in Indian format (DD Month YYYY)
  const formatIndianDate = (dateString: string) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get time in 12-hour format from UTC
  const getTimeFromUTC = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  };

  const getImageUrl = (images: Array<{url: string}>) => {
    if (images && images.length > 0 && images[0]?.url) {
      return images[0].url;
    }
    return 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format';
  };

  // Strip HTML tags and get plain text for description
  const stripHtml = (html: string) => {
    if (!html) return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  // Get first content text for description (strip HTML)
  const getDescription = (
    content: Array<{text: string}>,
    maxLength: number = 120,
  ) => {
    if (content && content.length > 0 && content[0]?.text) {
      const text = content[0].text;
      const cleanText = stripHtml(text)
        .replace(/&nbsp;/g, ' ')
        .trim();
      return cleanText.length > maxLength
        ? cleanText.substring(0, maxLength) + '...'
        : cleanText;
    }
    return 'No description available';
  };

  // Get category name
  const getCategoryName = (categories: Array<{name: string}>) => {
    if (categories && categories.length > 0 && categories[0]?.name) {
      const categoryName = categories[0].name;
      if (
        categoryName.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        )
      ) {
        return 'Latest';
      }
      return categoryName;
    }
    return 'Latest';
  };

  const loadMoreNews = () => {
    setVisibleNewsCount((prev) => Math.min(prev + 6, remainingNews.length));
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading news...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-50 flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <div className="mb-4 text-xl text-red-500">⚠️ Error loading news</div>
          <p className="text-gray-600">Please try again later</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    const todayIndian = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <div className="bg-gray-50 flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-gray-400 mb-4 text-6xl">📰</div>
          <p className="text-gray-600">
            No news articles published on {todayIndian}
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Check back later for updates
          </p>
        </div>
      </div>
    );
  }

  const visibleNews = remainingNews.slice(0, visibleNewsCount);
  const todayDate = formatIndianDate(new Date().toISOString());

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2 text-3xl font-bold sm:text-4xl">
            योजना अपडेट्स
          </h1>
          <p className="text-gray-500 text-sm">
            {todayDate} • {news.length} articles today
          </p>
        </div>

        {/* Hero Section + Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Hero Article - Takes 2 columns */}
          {heroNews && (
            <motion.article
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.1}}
              className="border-gray-100 overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-lg md:col-span-2"
            >
              <div className="relative aspect-video">
                <img
                  src={getImageUrl(heroNews.images)}
                  alt={heroNews.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="rounded bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    प्रमुख बातमी
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-gray-900 mb-3 text-xl font-bold leading-tight transition-colors hover:text-green-600 md:text-2xl">
                  {heroNews.title}
                </h2>

                <div className="text-gray-400 mb-3 flex items-center gap-2 text-xs">
                  <Calendar size={12} />
                  <span>{formatIndianDate(heroNews.publishedAt)}</span>
                  <span className="bg-gray-300 h-1 w-1 rounded-full"></span>
                  <Clock size={12} />
                  <span>{getTimeFromUTC(heroNews.publishedAt)}</span>
                </div>

                <p className="text-gray-600 mb-5 line-clamp-3 text-sm leading-relaxed">
                  {getDescription(heroNews.content, 180)}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    to="/news/$id"
                    params={{id: heroNews.id}}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                  >
                    अधिक माहिती
                    <ChevronRight size={16} />
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const url = `${window.location.origin}/news/${heroNews.id}`;
                      if (navigator.share) {
                        navigator
                          .share({
                            title: heroNews.title,
                            text: getDescription(heroNews.content),
                            url: url,
                          })
                          .catch(() => {});
                      } else {
                        navigator.clipboard.writeText(url);
                        toast.success('Link copied!');
                      }
                    }}
                    className="hover:bg-gray-100 rounded-full p-2 transition-colors"
                  >
                    <Share2 className="text-gray-500 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          )}

          {/* Side Articles - First 2 regular articles */}
          {remainingNews.slice(0, 2).map((newsItem, idx) => (
            <motion.article
              key={newsItem.id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.2 + idx * 0.1}}
              className="border-gray-100 overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video">
                <img
                  src={getImageUrl(newsItem.images)}
                  alt={newsItem.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&auto=format';
                  }}
                />
              </div>

              <div className="p-4">
                <h2 className="text-gray-900 mb-2 line-clamp-2 text-base font-bold leading-tight transition-colors hover:text-green-600">
                  {newsItem.title}
                </h2>

                <div className="text-gray-400 mb-3 flex items-center gap-2 text-xs">
                  <Calendar size={10} />
                  <span>{formatIndianDate(newsItem.publishedAt)}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-xs leading-relaxed">
                  {getDescription(newsItem.content, 80)}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    to="/news/$id"
                    params={{id: newsItem.id}}
                    className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
                  >
                    वाचा
                    <ChevronRight size={12} />
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const url = `${window.location.origin}/news/${newsItem.id}`;
                      if (navigator.share) {
                        navigator
                          .share({
                            title: newsItem.title,
                            text: getDescription(newsItem.content),
                            url: url,
                          })
                          .catch(() => {});
                      } else {
                        navigator.clipboard.writeText(url);
                        toast.success('Link copied!');
                      }
                    }}
                    className="hover:bg-gray-100 rounded-full p-1.5 transition-colors"
                  >
                    <Share2 className="text-gray-500 h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Remaining News Grid - 3 columns */}
        {visibleNews.length > 0 && (
          <div className="mt-8">
            <div className="border-gray-200 mb-6 border-t pt-8">
              <h2 className="text-gray-900 text-xl font-bold">
                ताज्या बातम्या
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleNews.map((newsItem, index) => (
                <motion.article
                  key={newsItem.id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.3 + index * 0.05}}
                  className="border-gray-100 overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-video">
                    <img
                      src={getImageUrl(newsItem.images)}
                      alt={newsItem.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&auto=format';
                      }}
                    />
                    <div className="absolute left-2 top-2">
                      <span className="rounded bg-green-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        {getCategoryName(newsItem.categories)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-gray-900 mb-2 line-clamp-2 min-h-[40px] text-sm font-bold leading-tight transition-colors hover:text-green-600">
                      {newsItem.title}
                    </h2>

                    <div className="text-gray-400 mb-3 flex items-center gap-2 text-xs">
                      <Calendar size={10} />
                      <span>{formatIndianDate(newsItem.publishedAt)}</span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2 text-xs leading-relaxed">
                      {getDescription(newsItem.content, 80)}
                    </p>

                    <div className="flex items-center justify-between">
                      <Link
                        to="/news/$id"
                        params={{id: newsItem.id}}
                        className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
                      >
                        वाचा
                        <ChevronRight size={12} />
                      </Link>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const url = `${window.location.origin}/news/${newsItem.id}`;
                          if (navigator.share) {
                            navigator
                              .share({
                                title: newsItem.title,
                                text: getDescription(newsItem.content),
                                url: url,
                              })
                              .catch(() => {});
                          } else {
                            navigator.clipboard.writeText(url);
                            toast.success('Link copied!');
                          }
                        }}
                        className="hover:bg-gray-100 rounded-full p-1.5 transition-colors"
                      >
                        <Share2 className="text-gray-500 h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Load More Button */}
        {visibleNewsCount < remainingNews.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMoreNews}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 sm:px-8 sm:text-base"
            >
              Load More News ({visibleNewsCount} of {remainingNews.length})
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
