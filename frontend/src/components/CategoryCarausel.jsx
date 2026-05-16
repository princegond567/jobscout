import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "DevOps Engineer",
  "Mobile Developer",
];

const CategoryCarausel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-16 px-4 relative">
      {/* Section label */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--fg-muted)' }}>
          Browse by Category
        </span>
      </div>

      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent className="px-2">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 pl-3">
              <button
                onClick={() => searchJobHandler(cat)}
                className="w-full px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#6A38C2] hover:text-white hover:border-transparent dark:hover:bg-[#6A38C2] dark:hover:text-white transition-colors"
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="glass-panel"
          style={{ color: 'var(--fg-muted)' }}
        />
        <CarouselNext
          className="glass-panel"
          style={{ color: 'var(--fg-muted)' }}
        />
      </Carousel>
    </section>
  );
};

export default CategoryCarausel;
