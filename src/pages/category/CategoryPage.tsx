import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryPageData } from "../../mock/categoryPageData";
import CategoryProductNavSection from "../../components/category/CategoryProductNavSection";
import CategoryHeroSection from "../../components/category/CategoryHeroSection";
import CategoryGetToKnowSection from "../../components/category/CategoryGetToKnowSection";
import CategoryExploreLineupSection from "../../components/category/CategoryExploreLineupSection";
import CategoryWhyBuySection from "../../components/category/CategoryWhyBuySection";
import CategoryEssentialsSection from "../../components/category/CategoryEssentialsSection";
import CategorySignificantOthersSection from "../../components/category/CategorySignificantOthersSection";

interface CategoryPageParams extends Record<string, string | undefined> {
  categoryName: string;
  categoryId: string;
}

const CategoryPage: React.FC = () => {
  const { categoryName, categoryId } = useParams<CategoryPageParams>();
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (categoryName && categoryPageData[categoryName as keyof typeof categoryPageData]) {
      setCategoryData(categoryPageData[categoryName as keyof typeof categoryPageData]);
      setLoading(false);
    } else {
      setError("Category data not found.");
      setLoading(false);
    }
  }, [categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!categoryData) {
    return <div>Category not found.</div>;
  }

  const { apple_intelligence, hero, get_to_know, explore_lineup, why_buy, essentials, significant_others } = categoryData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {apple_intelligence && <CategoryProductNavSection categoryId={categoryId || ""} />}

      {hero && <CategoryHeroSection hero={hero} />}

      {get_to_know && <CategoryGetToKnowSection get_to_know={get_to_know} />}

      {explore_lineup && <CategoryExploreLineupSection explore_lineup={explore_lineup} category_id={categoryId || " "} />}

      {why_buy && <CategoryWhyBuySection why_buy={why_buy} />}

      {essentials && <CategoryEssentialsSection essentials={essentials} />}

      {significant_others && <CategorySignificantOthersSection significant_others={significant_others} />}
    </div>
  );
};

export default CategoryPage;
